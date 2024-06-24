import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const ReadabilitySection: React.FC = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Why Readability Matters</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-700">Without VoxScribe</CardTitle>
              <CardDescription className="text-slate-600">Unformatted, messy transcription:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-md shadow-inner overflow-y-auto h-64">
                <p className="text-sm leading-relaxed text-slate-700">
                  yeah so um like I was saying the other day you know it's really important to uh to focus on on the key aspects of of the project and and make sure that we're we're hitting all the right notes you know what I mean like we can't just we can't just go in there half-cocked we gotta we gotta have a plan and and execute it flawlessly you know what I'm saying and and that's that's really the key to success in in this business you gotta you gotta be on top of your game 24/7 no no room for error...
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-700">With VoxScribe AI</CardTitle>
              <CardDescription className="text-slate-600">Formatted and readable transcription:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-md shadow-inner overflow-y-auto h-64">
                <p className="text-sm leading-relaxed text-slate-700">
                  Yeah, so um, like I was saying the other day, you know:<br/>
                  <strong>It's really important to:</strong><br/><br/>
                  • <strong>Focus on the key aspects</strong> of the project<br/>
                  • Make sure that we're <strong>hitting all the right notes</strong><br/><br/>
                  You know what I mean? Like:<br/><br/>
                  • We can't just go in there half-cocked<br/>
                  • We gotta <strong>have a plan</strong><br/>
                  • Execute it flawlessly<br/><br/>
                  You know what I'm saying? And that's really the key to success in this business:<br/><br/>
                  • You gotta be on top of your game 24/7<br/>
                  • No room for error...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReadabilitySection;