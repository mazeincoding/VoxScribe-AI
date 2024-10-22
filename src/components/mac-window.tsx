import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const MacWindow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn("w-full rounded-lg overflow-hidden", className)}
    {...props}
  />
))
MacWindow.displayName = "MacWindow"

const MacWindowHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn("flex-row items-center justify-between space-y-0 gap-2", className)}
    {...props}
  />
))
MacWindowHeader.displayName = "MacWindowHeader"

const MacWindowControls = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  >
    <div className="rounded-full size-3 bg-red-500"></div>
    <div className="rounded-full size-3 bg-yellow-500"></div>
    <div className="rounded-full size-3 bg-green-500"></div>
  </div>
))
MacWindowControls.displayName = "MacWindowControls"

const MacWindowContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn(className)} {...props} />
))
MacWindowContent.displayName = "MacWindowContent"

export { MacWindow, MacWindowHeader, MacWindowControls, MacWindowContent }
