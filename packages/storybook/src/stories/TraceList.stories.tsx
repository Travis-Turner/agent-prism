import type { TraceRecord } from "@ai-agent-trace-ui/types";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { TraceList, TraceListSource } from "@ai-agent-trace-ui/ui";
import {
  Description,
  Primary,
  Controls,
  Stories,
  Source,
} from "@storybook/blocks";

const meta = {
  title: "Main Components/TraceList",
  component: TraceList,
  parameters: {
    layout: "padded",
    docs: {
      page: () => (
        <>
          <Description />
          <Primary />
          <Controls />
          <Stories />
          <Source code={TraceListSource} language="tsx" />
        </>
      ),
    },
  },
  tags: ["autodocs"],
  argTypes: {
    traces: {
      description: "Array of trace records to display",
    },
    expanded: {
      control: "boolean",
      description: "Whether the trace list is expanded",
    },
    selectedTrace: {
      description: "Currently selected trace for highlighting",
    },
    className: {
      control: "text",
      description: "Optional className for the root container",
    },
  },
} satisfies Meta<typeof TraceList>;

const mockTraces: TraceRecord[] = [
  {
    id: "trace-001",
    name: "User Authentication Flow",
    spansCount: 8,
    durationMs: 1250,
    agentDescription: "Authentication service handling user login",
  },
  {
    id: "trace-002",
    name: "Data Processing Pipeline",
    spansCount: 15,
    durationMs: 3400,
    agentDescription: "ETL pipeline processing user data",
  },
  {
    id: "trace-003",
    name: "API Gateway Request",
    spansCount: 5,
    durationMs: 890,
    agentDescription: "Gateway routing and validation",
  },
];

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    traces: mockTraces,
    expanded: true,
    onExpandStateChange: () => {},
  },
};

export const Collapsed: Story = {
  args: {
    traces: mockTraces,
    expanded: false,
    onExpandStateChange: () => {},
  },
};

export const SelectedTrace: Story = {
  args: {
    traces: mockTraces,
    expanded: true,
    selectedTrace: mockTraces[1],
    onExpandStateChange: () => {},
    onTraceSelect: (trace) => console.log("Selected:", trace),
  },
};

export const EmptyList: Story = {
  args: {
    traces: [],
    expanded: true,
    onExpandStateChange: () => {},
  },
};

export const SingleTrace: Story = {
  args: {
    traces: [mockTraces[0]],
    expanded: true,
    onExpandStateChange: () => {},
  },
};
