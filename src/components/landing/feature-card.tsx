export function FeatureCard({ icon, title, description }: Feature) {
  return (
    <Card className="bg-gradient-to-br from-background to-secondary transition-all duration-500 group overflow-hidden">
      <CardContent className="p-4 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
        <div className="space-y-2">
          <div className="relative z-10">
            <div className="bg-primary text-primary-foreground rounded-2xl p-4 inline-block">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
