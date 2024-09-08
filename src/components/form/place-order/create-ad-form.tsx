import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { any, z } from "zod";
import { useState } from "react";

import { Form } from "@/components/ui/form";
import { createAd } from "@/services/api/modules/item/create-ad";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do item deve ter mais de 2 caracteres",
  }),
  description: z
    .string()
    .max(255, "A descrição deve ter no máximo 255 caracteres"),
  basePrice: z.string().transform((value) => Number(value)),
  gameId: z.string().min(1, "Informe o jogo que o item se refere"),
  availableOptions: z.array(
    z.object({
      name: z.string().min(2, "O nome da opção deve ter mais de 2 caracteres"),
      additionalPrice: z.string().transform((value) => Number(value)),
    })
  ),
  files: z.any(),
});

export function CreateAdForm() {
  const queryClient = useQueryClient(); // Obtém o cliente de query

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      basePrice: 0,
      gameId: "",
      availableOptions: [{ name: "", additionalPrice: 0 }],
      files: [],
    },
  });

  console.log(form.formState.errors);

  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () => setStep((prevStep) => prevStep - 1);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    try {
      const formData = new FormData();

      // Adiciona cada arquivo individualmente
      values.files.forEach((file: File) => {
        formData.append("files", file);
      });

      const availableOpt: any[] = [];
      values.availableOptions.forEach((options) => {
        availableOpt.push({
          name: options.name,
          additionalPrice: options.additionalPrice,
        });
      });

      formData.append("availableOptions", JSON.stringify(availableOpt));

      formData.append("description", values.description);
      formData.append("basePrice", String(values.basePrice));
      formData.append("name", values.name);
      formData.append("gameId", values.gameId);

      const request = await createAd(formData);

      toast({
        variant: "default",
        title: "Item Criado com sucesso!",
        description: "Nossa equipe deseja sucesso nas vendas! ✨",
        action: <ToastAction altText="Show!">Ok</ToastAction>,
      });

      // Invalida a query "items" para recarregar os itens
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });

      console.log(request);
    } catch (error: any) {
      toast({
        variant: "default",
        title: error.message,
        description: "Erro ao criar o Item",
      });
    }
  }

  console.log("form values", form.watch());

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {step === 0 && <StepOne onNext={nextStep} />}
        {step === 1 && <StepTwo onNext={nextStep} onPrevious={previousStep} />}
        {step === 2 && <StepThree onPrevious={previousStep} />}
      </form>
    </FormProvider>
  );
}
