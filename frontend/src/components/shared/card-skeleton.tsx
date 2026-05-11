import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { FieldSeparator } from '@/components/ui/field'
import { Skeleton } from '@/components/ui/skeleton'

export const CardSkeleton: React.FC = () => {
    return <Card className="max-w-60 w-full p-2">
        <CardContent className="flex h-40 items-center justify-center p-0">
            <Skeleton className="h-full w-full rounded-md" />
        </CardContent>

        <FieldSeparator />

        <CardDescription className="flex flex-col gap-2 py-3">
            <Skeleton className="h-6 w-3/4" />

            <Skeleton className="h-4 w-1/2" />

            <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
            </div>
        </CardDescription>

        <CardFooter className="flex justify-between py-1">
            <Skeleton className="h-9 w-24 rounded-md" />

            <Skeleton className="h-9 w-9 rounded-md" />
        </CardFooter>
    </Card>
}