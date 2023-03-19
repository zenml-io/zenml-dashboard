import { MarkerType, Position } from 'react-flow-renderer';

declare module 'react-flow-renderer' {
  interface NodeProps<T = any> {
    data: T;
    targetPosition?: Position;
    sourcePosition?: Position;
    onNodeSelection?: (node: Node) => void; // added this line to declare onNodeSelection prop
  }
}
