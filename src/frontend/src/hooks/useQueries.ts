import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useBookAppointment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      serviceType: string;
      preferredDate: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.bookAppointment(
        data.name,
        data.email,
        data.phone,
        data.serviceType,
        data.preferredDate,
        data.message,
      );
    },
  });
}
