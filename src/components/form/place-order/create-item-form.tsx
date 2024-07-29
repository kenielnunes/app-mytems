import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Form } from "@/components/ui/form";
import { createItem } from "@/services/api/modules/item/create-item";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
  itemName: z.string().min(2, {
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
  files: z.array(
    z.object({
      file: z.instanceof(File),
    })
  ),
});

export function CreateItemForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      description: "",
      basePrice: 0,
      gameId: "",
      availableOptions: [{ name: "", additionalPrice: 0 }],
      files: [],
    },
  });

  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () => setStep((prevStep) => prevStep - 1);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();

      // Adiciona cada arquivo individualmente
      values.files.forEach((file) => {
        formData.append("files", file.file);
      });

      if (values.availableOptions && values.availableOptions.length > 0) {
        for (let i = 0; i < values.availableOptions.length; i++) {
          formData.append(
            "availableOptions",
            JSON.stringify({
              additionalPrice: values.availableOptions[i].additionalPrice,
              name: values.availableOptions[i].name,
            })
          );
        }
      } else {
        formData.append("availableOptions", JSON.stringify([]));
      }

      formData.append("description", values.description);
      formData.append("basePrice", String(values.basePrice));
      formData.append("name", values.itemName);
      formData.append("gameId", values.gameId);

      const request = await createItem(formData);

      toast({
        variant: "default",
        title: "Item Criado com sucesso!",
        description: "Nossa equipe deseja sucesso nas vendas! ✨",
        action: <ToastAction altText="Show!">Ok</ToastAction>,
      });

      console.log(request);
    } catch (error) {
      toast({
        variant: "default",
        title: error.message,
        description:
          "Verifique a caixa de entrada do email informado e entre com  seu magic link ✨",
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {step === 0 && <StepOne onNext={nextStep} />}
        {step === 1 && <StepTwo onNext={nextStep} onPrevious={previousStep} />}
        {step === 2 && <StepThree onPrevious={previousStep} />}
      </form>
    </FormProvider>
  );
}
