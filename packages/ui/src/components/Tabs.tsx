import type { ComponentPropsWithRef } from "react";

import * as RadixTabs from "@radix-ui/react-tabs";
import cn from "classnames";
import * as React from "react";

export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type TabTheme = "underline" | "pill";

const BASE_TRIGGER =
  "text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const THEMES = {
  underline: {
    list: "h-9 flex border-b border-gray-200 dark:border-gray-800",
    trigger: `w-full justify-center px-3 ${BASE_TRIGGER} 
      text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900
      dark:text-gray-400 dark:hover:text-gray-200 dark:data-[state=active]:text-gray-200
      border-b-2 border-transparent data-[state=active]:border-gray-900 
      dark:data-[state=active]:border-gray-300 -mb-[2px]
      hover:border-gray-300 dark:hover:border-gray-600`,
  },
  pill: {
    list: "h-9 inline-flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg",
    trigger: `px-3 ${BASE_TRIGGER} rounded-md
      text-gray-600 hover:text-gray-900 data-[state=active]:text-gray-900
      dark:text-gray-400 dark:hover:text-gray-200 dark:data-[state=active]:text-gray-200
      hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:shadow-sm
      dark:hover:bg-gray-700 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:shadow-none`,
  },
} as const;

export type TabsProps<T extends string = string> = Omit<
  ComponentPropsWithRef<"div">,
  "dir"
> & {
  /**
   * Array of tab items to display
   */
  items: TabItem<T>[];

  /**
   * The initially selected tab value (uncontrolled)
   */
  defaultValue?: T;

  /**
   * The currently selected tab value (controlled)
   */
  value?: T;

  /**
   * Callback fired when the selected tab changes
   */
  onValueChange?: (value: T) => void;

  /**
   * Visual theme variant for the tabs
   * @default "underline"
   */
  theme?: TabTheme;

  /**
   * Optional className for the root container
   */
  className?: string;

  /**
   * Optional className for the tabs list container
   */
  tabsListClassName?: string;

  /**
   * Optional className for individual tab triggers
   */
  triggerClassName?: string;

  /**
   * The direction of the content of the tabs
   */
  dir?: "ltr" | "rtl";
};

export const Tabs = <T extends string = string>({
  items,
  defaultValue,
  value,
  onValueChange,
  theme = "underline",
  className = "",
  tabsListClassName = "",
  triggerClassName = "",
  dir,
  ...rest
}: TabsProps<T>) => {
  const defaultTab = defaultValue || items[0]?.value;

  const currentTheme = THEMES[theme];

  return (
    <RadixTabs.Root
      className={className}
      defaultValue={!value ? defaultTab : undefined}
      value={value}
      onValueChange={onValueChange as (value: string) => void}
      dir={dir}
      {...rest}
    >
      <RadixTabs.List
        className={cn(currentTheme.list, tabsListClassName)}
        aria-label="Navigation tabs"
      >
        {items.map((item: TabItem) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(
              "group flex items-center overflow-hidden",
              currentTheme.trigger,
              triggerClassName,
            )}
          >
            {item.icon && (
              <span className="mr-2 text-gray-500 group-data-[state=active]:text-current dark:text-gray-400">
                {item.icon}
              </span>
            )}
            <span className="truncate text-sm font-medium">{item.label}</span>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </RadixTabs.Root>
  );
};
