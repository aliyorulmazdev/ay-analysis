"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Sample data for the charts
const analysisData = [
  { date: "2024-07-01", analyses: 120, accepted: 80 },
  { date: "2024-07-02", analyses: 150, accepted: 100 },
  { date: "2024-07-03", analyses: 200, accepted: 120 },
  // More data points...
];

const companyData = [
  { company: "Company A", analyses: 300 },
  { company: "Company B", analyses: 250 },
  { company: "Company C", analyses: 400 },
];

const employeeData = [
  { employee: "Employee 1", analyses: 150 },
  { employee: "Employee 2", analyses: 200 },
  { employee: "Employee 3", analyses: 250 },
];

const chartConfig = {
  analyses: {
    label: "Analyses",
    color: "hsl(var(--chart-1))",
  },
  accepted: {
    label: "Accepted",
    color: "hsl(var(--chart-2))",
  },
  company: {
    label: "Company",
    color: "hsl(var(--chart-3))",
  },
  employee: {
    label: "Employee",
    color: "hsl(var(--chart-4))",
  },
  archive: {
    label: "Archive",
    color: "hsl(var(--chart-5))",
  },
  trend: {
    label: "Trend",
    color: "hsl(var(--chart-6))",
  },
  category: {
    label: "Category",
    color: "hsl(var(--chart-7))",
  },
};

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p>Merhabalar, Edremit Ticaret Borsası Analiz Laboratuvarı Hoş geldiniz.</p>
        <p>Son Analiz Tarihi: 23.07.2024</p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Analysis Data Bar Chart */}
        <Card className="text-xs">
          <CardHeader>
            <CardTitle>Analysis Data</CardTitle>
            <CardDescription>Total analyses and accepted over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={analysisData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="analyses" fill="var(--color-analyses)" />
                <Bar dataKey="accepted" fill="var(--color-accepted)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Company-Based Analysis Bar Chart */}
        <Card className="text-xs">
          <CardHeader>
            <CardTitle>Company-Based Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={companyData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="company" tickLine={false} axisLine={false} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="analyses" fill="var(--color-company)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Employee-Based Analysis Bar Chart */}
        <Card className="text-xs">
          <CardHeader>
            <CardTitle>Employee-Based Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={employeeData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="employee" tickLine={false} axisLine={false} />
                <YAxis />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="analyses" fill="var(--color-employee)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
