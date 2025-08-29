import type { TraceSpan } from "@ai-agent-trace-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SpanCard, SpanCardSource } from "@ai-agent-trace-ui/ui";

const meta = {
  title: "Main Components/SpanCard",
  component: SpanCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
\`\`\`tsx
${SpanCardSource}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "The trace span data to display",
    },
    level: {
      control: "number",
      description: "The nesting level of the span",
      defaultValue: 0,
    },
    selectedSpan: {
      description: "Currently selected span for highlighting",
    },
    avatar: {
      description: "Optional avatar configuration",
    },
    expandButton: {
      control: { type: "select" },
      options: ["inside", "outside"],
      description: "Placement of the expand button",
      defaultValue: "outside",
    },
    isLastChild: {
      control: "boolean",
      description: "Whether this is the last child in its parent",
      defaultValue: false,
    },
  },
} satisfies Meta<typeof SpanCard>;

const mockTraceSpan: TraceSpan = {
  id: "span-llm-001",
  title: "GPT-4 Text Generation",
  startTime: new Date("2024-01-15T10:30:00Z"),
  endTime: new Date("2024-01-15T10:30:03Z"),
  duration: 3000,
  cost: 0.045,
  type: "llm_call",
  raw: JSON.stringify({
    model: "gpt-4",
    prompt: "Generate a creative story about AI",
    temperature: 0.7,
    max_tokens: 1000,
  }),
  attributes: [
    {
      key: "llm.model",
      value: { stringValue: "gpt-4" },
    },
    {
      key: "llm.temperature",
      value: { intValue: "0.7" },
    },
  ],
  tokensCount: 850,
  status: "success",
};

const mockTraceSpanWithChildren: TraceSpan = {
  ...mockTraceSpan,
  id: "span-parent-001",
  title: "Parent Span with Children",
  children: [
    {
      ...mockTraceSpan,
      id: "span-child-001",
      title: "Child Span 1",
      type: "tool_execution",
      status: "success",
    },
    {
      ...mockTraceSpan,
      id: "span-child-002",
      title: "Child Span 2",
      type: "retrieval",
      status: "error",
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockTraceSpan,
    minStart: mockTraceSpan.startTime.getTime(),
    maxEnd: mockTraceSpan.endTime.getTime(),
    isLastChild: false,
    expandedSpansIds: [],
    onExpandSpansIdsChange: () => {},
    expandButton: "outside",
  },
};

export const Level: Story = {
  args: {
    data: mockTraceSpan,
    level: 2,
    minStart: mockTraceSpan.startTime.getTime(),
    maxEnd: mockTraceSpan.endTime.getTime(),
    isLastChild: false,
    expandedSpansIds: [],
    onExpandSpansIdsChange: () => {},
    expandButton: "outside",
  },
};

export const ExpandButton: Story = {
  args: {
    data: mockTraceSpanWithChildren,
    minStart: mockTraceSpan.startTime.getTime(),
    maxEnd: mockTraceSpan.endTime.getTime(),
    isLastChild: false,
    expandedSpansIds: [],
    onExpandSpansIdsChange: () => {},
    expandButton: "inside",
  },
};

export const Avatar: Story = {
  args: {
    data: mockTraceSpan,
    avatar: {
      alt: "LLM Service",
      bgColor: "purple",
      size: "sm",
      letter: "AI",
    },
    minStart: mockTraceSpan.startTime.getTime(),
    maxEnd: mockTraceSpan.endTime.getTime(),
    isLastChild: false,
    expandedSpansIds: [],
    onExpandSpansIdsChange: () => {},
    expandButton: "outside",
  },
};

export const SelectedSpan: Story = {
  args: {
    data: mockTraceSpan,
    selectedSpan: mockTraceSpan,
    minStart: mockTraceSpan.startTime.getTime(),
    maxEnd: mockTraceSpan.endTime.getTime(),
    isLastChild: false,
    expandedSpansIds: [],
    onExpandSpansIdsChange: () => {},
    expandButton: "outside",
  },
};

export const WithChildren: Story = {
  args: {
    data: mockTraceSpanWithChildren,
    minStart: mockTraceSpan.startTime.getTime(),
    maxEnd: mockTraceSpan.endTime.getTime(),
    isLastChild: false,
    expandedSpansIds: ["span-parent-001"],
    onExpandSpansIdsChange: () => {},
    expandButton: "outside",
  },
};
