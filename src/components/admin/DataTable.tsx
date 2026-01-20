"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function DocumentsTable() {
  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue="outline" className="w-full">
          <TabsList>
            <TabsTrigger value="outline">Outline</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          {/* OUTLINE TAB */}
          <TabsContent value="outline">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Header</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Reviewer</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>Executive Summary</TableCell>
                    <TableCell>Narrative</TableCell>
                    <TableCell>Done</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>Eddie Lake</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Design</TableCell>
                    <TableCell>Narrative</TableCell>
                    <TableCell>In Process</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell>Jamik</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </TabsContent>

          {/* PERFORMANCE TAB */}
          <TabsContent value="performance">
            <CardContent>
              <p className="text-sm text-slate-600">Performance content here...</p>
            </CardContent>
          </TabsContent>

          {/* DOCUMENTS TAB */}
          <TabsContent value="documents">
            <CardContent>
              <p className="text-sm text-slate-600">Documents content...</p>
            </CardContent>
          </TabsContent>

        </Tabs>
      </CardHeader>
    </Card>
  );
}
