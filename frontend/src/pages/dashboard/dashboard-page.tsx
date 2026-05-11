import { CardSkeleton } from '@/components/shared/card-skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import { FieldSeparator } from '@/components/ui/field'
import { useCourses } from '@/features/courses/hooks/use-courses'
import type { Course } from '@/features/courses/types/course-types'
import React from 'react'

export const DashboardPage: React.FC = () => {
    const { data, isLoading } = useCourses()
    return (
        <>
            <div className='flex flex-wrap gap-4 max-w-full flex-1'>
                {data && data?.data.map((c: Course) => (
                    <Card className='p-2 max-w-60'>
                        <CardContent className='h-40 flex p-0 justify-center items-center'>
                            <img src={`${c.thumbnail}`} alt="thumbnail" className='object-cover w-full h-full' />
                        </CardContent>
                        <FieldSeparator />
                        <CardDescription className='flex flex-col text-wrap'>
                            <h3 className='text-xl text-neutral-900'>{c.title}</h3>
                            <p className='text-sm text-neutral-900'>{c.author}</p>
                            <p className='text-sm text-neutral-500 text-wrap'>{c.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, facilis.</p>
                        </CardDescription>
                        <CardFooter className='flex justify-between text-black py-1'>
                            Price {c.price || "29999"}
                            <Button>
                                Purchase
                            </Button>
                        </CardFooter>
                    </Card>
                ))
                }
                {
                    isLoading && <CardSkeleton />
                }
            </div>
        </>
    )
}

