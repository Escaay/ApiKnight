import { ReactNode } from "react";

interface ArrayItem {
    key: number;
    title: ReactNode;
    pid: number;
    type: string;
    isLeaf?: boolean | undefined
}

interface TreeNode {
    key: number;
    title: ReactNode;
    type: string;
    pid: number;
    children?: TreeNode[];
    isLeaf?: boolean
}

export type { TreeNode , ArrayItem };