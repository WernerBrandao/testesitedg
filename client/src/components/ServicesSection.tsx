import React from 'react';
import { trpc } from "@/lib/trpc";
import { ExternalLink } from "lucide-react";

interface ServicesSectionProps {
  visibility: 'site' | 'intranet';
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ visibility }) => {
  const { data: services, isLoading } = trpc.services.getAll.useQuery({ visibility });

  const handleServiceClick = (id: string) => {
    console.log('Service clicked:', id);
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: 'var(--degase-blue-light)' }}>
          Serviços
        </h2>
        <div className="w-16 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--degase-blue-dark)' }}></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            [1,2,3,4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            ))
          ) : (
            services?.map((service) => (
              <a
                key={service.id}
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                onClick={() => handleServiceClick(service.id)}
              >
                <div
                  className="h-32 rounded-lg p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: service.color }}
                >
                  <img src={service.icon} alt={service.name} className="h-8 w-8 object-contain" />
                  <h3 className="text-white font-semibold text-sm group-hover:font-bold">
                    {service.name}
                  </h3>
                  <ExternalLink size={14} className="text-white/70 mx-auto mt-1 group-hover:text-white" />
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;