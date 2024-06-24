type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div className="text-left">
        <h3 className="text-xl font-medium text-primary-foreground">{title}</h3>
        <p className="text-primary-foreground/80">{description}</p>
      </div>
    </div>
  );
}
