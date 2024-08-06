import dynamic, { DynamicOptions, Loader } from "next/dynamic";

/**
 * Same as `next/dynamic` but always returns `React.FC`
 */
export function dynamicComponent<P>(
  dynamicOptions: DynamicOptions<P> | Loader<P>,
  options?: DynamicOptions<P>
): React.FC<P> {
  return dynamic(dynamicOptions, { ...options }) as React.FC<P>;
}
