import { useState, useCallback, type FC } from "react";

import type { SpanCardType } from "../types/span";

import { flattenSpans } from "../services/flatten-span-cards.ts";
import { Badge } from "./Badge.tsx";
import { SpanCard } from "./SpanCard";
import { SpanCardsList } from "./SpanCardsList";

interface TreeViewProps {
  spans: SpanCardType[];
  onSelectionChange?: (selectedId: string | undefined) => void;
  className?: string;
  initialSelectedId?: string;
  expandButton: "inside" | "outside";
}

export const TreeView: FC<TreeViewProps> = ({
  spans,
  onSelectionChange,
  className = "",
  initialSelectedId,
  expandButton,
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    initialSelectedId,
  );

  const countTotalSpans = (items: SpanCardType[]): number => {
    return items.reduce((count, item) => {
      return count + 1 + (item.children ? countTotalSpans(item.children) : 0);
    }, 0);
  };

  const totalSpans = countTotalSpans(spans);

  const allCards = flattenSpans(spans);

  const minStart = Math.min(...allCards.map((c) => +new Date(c.startTime)));
  const maxEnd = Math.max(...allCards.map((c) => +new Date(c.endTime)));

  const handleCardSelectionChange = useCallback(
    (cardId: string, isSelected: boolean) => {
      const newSelectedId = isSelected ? cardId : undefined;
      setSelectedCardId(newSelectedId);
      onSelectionChange?.(newSelectedId);
    },
    [onSelectionChange],
  );

  return (
    <div className={`border bg-white ${className}`}>
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex w-full items-center gap-2">
          <h3>Span Tree</h3>

          <Badge theme="yellow">
            {totalSpans} {totalSpans === 1 ? "Span" : "Spans"}
          </Badge>

          <Badge theme="gray">{spans.length} Top-Level Spans</Badge>

          <div className="ml-auto flex items-center gap-3">
            <button type="button">Expand all</button>
            <button type="button">Collapse all</button>
          </div>
        </div>
      </div>

      <div className="p-2">
        <SpanCardsList>
          {spans.map((span) => (
            <SpanCard
              expandButton={expandButton}
              key={span.id}
              data={span}
              level={0}
              selectedCardId={selectedCardId}
              onSelectionChange={handleCardSelectionChange}
              minStart={minStart}
              maxEnd={maxEnd}
            />
          ))}
        </SpanCardsList>
      </div>
    </div>
  );
};
