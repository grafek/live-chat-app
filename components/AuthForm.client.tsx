"use client";

import Input from "./Input.client";
import Link from "next/link";
import Button from "./Buttons.client";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  type ClientSafeProvider,
  type LiteralUnion,
  signIn,
} from "next-auth/react";
import Image from "next/image";
import { type BuiltInProviderType } from "next-auth/providers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "./Loaders.server";

interface IProps {
  formAction: "Login" | "Register";
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | never[];
}

interface IAuthFormValues {
  name?: string;
  email: string;
  password: string;
}

const authFormDefaultValues: IAuthFormValues = {
  name: "",
  email: "",
  password: "",
};

const AuthForm: React.FC<IProps> = ({ formAction, providers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAuthFormValues>({
    defaultValues: authFormDefaultValues,
  });

  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit: SubmitHandler<IAuthFormValues> = async (formData) => {
    setError("");
    
    if (formAction === "Register") {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          await signIn("credentials", {
            ...formData,
          });
          router.push("/chats");
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(`Unexpected error: ${JSON.stringify(e)}`);
        }
      }
    } else {
      try {
        const res = await signIn("credentials", {
          ...formData,
          redirect: false,
        });
        if (res?.error) {
          throw new Error(res.error);
        }
        router.push("/chats");
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError(`Unexpected error: ${JSON.stringify(e)}`);
        }
      }
    }
  };
  return (
    <div className="border px-8 py-4 shadow-md md:w-1/2 lg:w-2/5">
      <h1 className="py-3 text-center text-xl md:text-2xl">
        <span className="font-semibold">{formAction}</span> to continue
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-2"
      >
        {formAction === "Register" ? (
          <div className="relative w-full">
            <Input
              labelname="Name"
              id="name"
              name="name"
              autoComplete="username"
              errors={errors.name}
              register={register}
              validation={{
                pattern: {
                  value: /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/i,
                  message: "Not a valid name!",
                },
                maxLength: { value: 20, message: "Please choose shorter name" },
                required: { value: true, message: "Name is required!" },
              }}
            />
          </div>
        ) : null}

        <div className="relative w-full">
          <Input
            labelname="E-mail"
            id="email"
            name="email"
            autoComplete="email"
            errors={errors.email}
            register={register}
            validation={{
              required: { value: true, message: "E-mail is required!" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Not a valid e-mail!",
              },
            }}
          />
        </div>
        <div className="relative w-full">
          <Input
            labelname="Password"
            type="password"
            id="password"
            name="password"
            autoComplete={
              formAction === "Login" ? "current-password" : "new-password"
            }
            errors={errors.password}
            register={register}
            validation={{
              required: { value: true, message: "Password is required!" },
              minLength: {
                value: 8,
                message: "Password must be longer than 8 characters!",
              },
            }}
          />
        </div>

        <Button
          title={formAction}
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-full items-center justify-center rounded-md bg-violet-500 py-2 text-lg text-white hover:bg-violet-600"
        >
          {isSubmitting ? <Spinner /> : formAction}
        </Button>
      </form>

      <p
        role={"alert"}
        className="pt-2 text-center text-sm font-semibold text-red-500 md:text-base"
      >
        {error ? error : null}
      </p>

      <div className="flex w-full items-center gap-2 py-3 text-sm text-gray-500">
        <div className="h-[1px] flex-1 bg-gray-300" />
        <div>
          <span>OR </span>
          <span className="hidden md:inline">CONTINUE WITH</span>
        </div>
        <div className="h-[1px] flex-1 bg-gray-300" />
      </div>
      <div className="flex flex-wrap gap-4">
        {Object.values(providers)
          .filter((provider) => provider.name != "Credentials")
          .map((provider) => (
            <Button
              key={provider.id}
              title={`Login with ${provider.name}`}
              onClick={() => signIn(provider.id, { redirect: false })}
              className="flex w-full justify-center gap-2 rounded-md border px-4 py-2 hover:bg-gray-100"
            >
              <Image
                src={`/${provider.id}.svg`}
                width={24}
                height={24}
                alt={`${provider.id} logo`}
              />
              {provider.name}
            </Button>
          ))}
        <Link
          href={`/auth/${formAction === "Register" ? "login" : "register"}`}
          className="flex-1 text-center text-violet-700 hover:underline"
        >
          {`${formAction === "Register" ? "Login" : "Register"}`}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
