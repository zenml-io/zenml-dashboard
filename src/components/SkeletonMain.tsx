import { Skeleton } from "@zenml-io/react-component-library";
import { cn } from "@zenml-io/react-component-library/utilities";

export const SkeletonMain = ({ className }: { className?: any }) => {
	return (
		<div className={cn(className)}>
			<div className="mb-5 flex justify-between">
				<Skeleton className="h-[50px] w-[205px]" />
				<Skeleton className="h-[40px] w-[115px] " />
			</div>
			<Skeleton className="h-[300px] w-full" />
		</div>
	);
};
