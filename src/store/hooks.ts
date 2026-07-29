import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

/**
 * Typed `useDispatch` hook — pre-bound to `AppDispatch`.
 * Use this everywhere instead of raw `useDispatch`.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed `useSelector` hook — pre-bound to `RootState`.
 * Use this everywhere instead of raw `useSelector`.
 */
export const useAppSelector = useSelector.withTypes<RootState>();
