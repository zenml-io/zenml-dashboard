import { MarkerType, Position } from 'react-flow-renderer';

declare module 'react-flow-renderer' {
  interface NodeProps<T = any> {
    data: T;
    targetPosition?: Position;
    sourcePosition?: Position;
  }
}
