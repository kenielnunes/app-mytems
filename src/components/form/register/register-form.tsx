import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { any, z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { createItem } from "@/services/api/modules/item/create-item";

import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { createUser } from "@/services/api/modules/user/create-user";
import { useRouter } from "next/router";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nickname obrigatório",
  }),
  email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
  biography: z
    .string()
    .max(255, "A biografia deve ter no máximo 255 caracteres")
    .optional(),
  birthday: z.string().min(4, "Informe uma data dew nascimento correta"),
  profileImg: z.any(),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      biography: "",
      birthday: "",
      email: "",
      profileImg: null,
    },
  });

  const { push } = useRouter();

  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () => setStep((prevStep) => prevStep - 1);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    const { birthday } = values;

    // Divida a string de data
    const [day, month, year] = birthday.split("/");

    // Crie a string no formato YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    // Crie a data usando o construtor nativo
    const date = new Date(formattedDate);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("biography", values.biography ?? "");
      formData.append("birthday", String(date));
      formData.append("profileImg", values.profileImg);
      formData.append("email", values.email);
      formData.append("origin", "PERSONAL_MAIL");

      console.log("formData", formData);

      const request = await createUser(formData);

      toast({
        variant: "default",
        title: "Cadastrado com sucesso!",
        description: "Nossa equipe deseja sucesso nas vendas! ✨",
        action: <ToastAction altText="Show!">Ok</ToastAction>,
      });

      push("/");

      console.log(request);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "error.response.data.message",
        description: "Verifique os campos e tente novamente",
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {step === 0 && <StepOne onNext={nextStep} />}
        {step === 1 && <StepTwo onNext={nextStep} onPrevious={previousStep} />}
      </form>
    </FormProvider>
  );
}
