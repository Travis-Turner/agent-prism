import { type TraceSpan } from "@evilmartians/agent-prism-types";
import { type ReactElement, useState } from "react";

import type { TabItem } from "../Tabs";

import { CollapsibleSection } from "../CollapsibleSection";
import { TabSelector } from "../TabSelector";
import {
  DetailsViewContentViewer,
  type DetailsViewContentViewMode,
} from "./DetailsViewContentViewer";

interface AttributesTabProps {
  data: TraceSpan;
}

const TAB_ITEMS: TabItem<DetailsViewContentViewMode>[] = [
  { value: "json", label: "JSON" },
  { value: "plain", label: "Plain" },
];

export const DetailsViewAttributesTab = ({
  data,
}: AttributesTabProps): ReactElement => {
  if (!data.attributes || data.attributes.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No attributes available for this span.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.attributes.map((attribute, index) => {
        const stringValue = attribute.value.stringValue;
        const simpleValue =
          stringValue ||
          attribute.value.intValue?.toString() ||
          attribute.value.boolValue?.toString() ||
          "N/A";

        let parsedJson: string | null = null;
        if (typeof stringValue === "string") {
          try {
            parsedJson = JSON.parse(stringValue);
          } catch {
            parsedJson = null;
          }
        }

        const isComplex = parsedJson !== null;

        if (isComplex && parsedJson && stringValue) {
          return (
            <AttributeSection
              key={`${attribute.key}-${index}`}
              attributeKey={attribute.key}
              content={stringValue}
              parsedContent={parsedJson}
              id={`${data.id}-${attribute.key}-${index}`}
            />
          );
        }

        return (
          <div
            key={`${attribute.key}-${index}`}
            className="rounded-md border border-gray-200 p-4 dark:border-gray-800"
          >
            <dt className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {attribute.key}
            </dt>
            <dd className="break-words text-sm text-gray-900 dark:text-gray-100">
              {simpleValue}
            </dd>
          </div>
        );
      })}
    </div>
  );
};

interface AttributeSectionProps {
  attributeKey: string;
  content: string;
  parsedContent: string;
  id: string;
}

const AttributeSection = ({
  attributeKey,
  content,
  parsedContent,
  id,
}: AttributeSectionProps): ReactElement => {
  const [tab, setTab] = useState<DetailsViewContentViewMode>("json");

  return (
    <CollapsibleSection
      title={attributeKey}
      defaultOpen
      rightContent={
        <TabSelector<DetailsViewContentViewMode>
          items={TAB_ITEMS}
          defaultValue="json"
          value={tab}
          onValueChange={setTab}
          theme="pill"
          onClick={(event) => event.stopPropagation()}
        />
      }
    >
      <DetailsViewContentViewer
        content={content}
        parsedContent={parsedContent}
        mode={tab}
        label={attributeKey}
        id={id}
      />
    </CollapsibleSection>
  );
};
