"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ActivitType } from "@/types/user-role";
import { deleteActivityAction } from "@/app/action/delete-activity";

export type activityType = {
  id: string;
  type: ActivitType;
  time: string;
  system: string;
};

export const columns: ColumnDef<activityType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return <span className="lowercase first-letter:uppercase">{type}</span>;
    },
  },

  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const time = row.getValue("time") as string;
      return <Badge className="w-fit line-clamp-1">{time}</Badge>;
    },
  },
  {
    accessorKey: "system",
    header: "system",
    cell: ({ row }) => {
      const system = row.getValue("system") as string;

      return <Badge className="bg-sky-700">{system}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row?.original;

      const handleDelete = async () => {
        if (!id) {
          return;
        }
        await deleteActivityAction(id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-500 cursor-pointer"
            >
              <Trash className="w-4 h-4 mr-2" />
              delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
