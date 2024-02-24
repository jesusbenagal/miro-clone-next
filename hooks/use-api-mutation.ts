import { useState } from "react";
import { useMutation } from "convex/react";
import { FunctionReference, OptionalRestArgs } from "convex/server";

export const useApiMutation = <Mutation extends FunctionReference<"mutation">>(
  mutationFunction: Mutation
) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = async (...payload: OptionalRestArgs<Mutation>) => {
    setPending(true);
    return apiMutation(...payload)
      .then((result) => result)
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setPending(false);
      });
  };

  return { mutate, pending };
};
