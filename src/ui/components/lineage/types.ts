import { MarkerType, Position } from 'react-flow-renderer';

export interface NodeProps<T = any> {
  data: T;
  targetPosition?: Position;
  sourcePosition?: Position;
}
