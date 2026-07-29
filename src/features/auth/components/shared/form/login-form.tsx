import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { usePostMutation } from "@/hooks/use-tanstack-query";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { setLocalStorage } from "@/utils/storage-utils";
import { env } from "@/config/env";
import { loginSchema, type LoginSchema } from "../../../schema/login-schema";
import { AUTH_API_ENDPOINTS } from "../../../config/api-endpoints";
import { AUTH_TANSTACK_KEYS } from "../../../config/tanstack-keys";
import type { LoginApiResponse } from "../../../types/api-types";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = usePostMutation<LoginSchema, LoginApiResponse>(
    AUTH_TANSTACK_KEYS.LOGIN,
    AUTH_API_ENDPOINTS.LOGIN,
  );

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      // Persist token to localStorage for boot-time hydration
      setLocalStorage(env.VITE_AUTH_TOKEN_SECRET, response.accessToken);

      // Dispatch to Redux — single source of truth
      dispatch(
        setCredentials({
          accessToken: response.accessToken,
          user: response.user,
        }),
      );

      // Navigate to dashboard on success
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid email or password";
      setError("root", { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Email */}
      <Field>
        <Label htmlFor="email">Email</Label>
        <FieldContent>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            autoFocus
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </FieldContent>
      </Field>

      {/* Password */}
      <Field>
        <Label htmlFor="password">Password</Label>
        <FieldContent>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              className="pr-9"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <FieldError errors={[errors.password]} />
        </FieldContent>
      </Field>

      {/* Root error (API error) */}
      {errors.root && (
        <div
          role="alert"
          className="bg-destructive/10 text-destructive rounded-lg border border-destructive/20 px-3 py-2 text-sm"
        >
          {errors.root.message}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>

      {/* Links */}
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <Link
          to="/auth/forgot-password"
          className="hover:text-foreground underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
        <Link
          to="/auth/sign-up"
          className="hover:text-foreground underline-offset-4 hover:underline"
        >
          Create account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
