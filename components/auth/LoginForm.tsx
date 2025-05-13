"use client";

import React, { ChangeEvent, useEffect } from "react";
import toast from "react-hot-toast";

import { useFormValidate } from "@/hooks/useFormValidate";
import { login } from "@/actions/login";

import FormCard from "@/components/auth/FormCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/auth/FormMessage";
import Submit from "@/components/auth/Submit";

import { LoginSchema } from "@/schemas/auth";
import { TLoginFormError } from "@/types/form";

export function LoginForm() {
  const [error, action] = React.useActionState(login, undefined);

  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginSchema);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="로그인"
      footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
    >
      <form action={action} className="space-y-6 w-full">
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            error={!!errors?.email}
            onChange={handleChange}
          />
          {errors?.email && <FormMessage message={errors.email[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            error={!!errors?.password}
            onChange={handleChange}
          />
          {errors?.password && <FormMessage message={errors.password[0]} />}
        </div>
        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  );
}
