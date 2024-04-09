import { PropsWithChildren } from "react";
import { Handle, Position } from "reactflow";

export function BaseNode({ children }: PropsWithChildren) {
	return (
		<>
			<Handle
				style={{ border: "transparent", top: 0, background: "transparent", width: 0, height: 0 }}
				type="target"
				position={Position.Top}
			/>
			<div className="flex w-[300px] items-center justify-center">{children}</div>
			<Handle
				isConnectable={false}
				type="source"
				style={{ border: "transparent", bottom: 0, background: "transparent", width: 0, height: 0 }}
				position={Position.Bottom}
			/>
		</>
	);
}
