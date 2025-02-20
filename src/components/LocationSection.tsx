import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

interface Contact {
  phone: string;
  address: {
    mall: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    location: string;
  };
  hours: string;
  daysOpen: string;
}

interface LocationSectionProps {
  contact: Contact;
}

const LocationSection = ({ contact }: LocationSectionProps) => {
  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Visit Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Located in the Food Court at {contact.address.mall}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-red-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">{contact.address.mall} {contact.address.location}</p>
                  <p className="text-gray-600">{contact.address.street}</p>
                  <p className="text-gray-600">{contact.address.city}, {contact.address.state} {contact.address.zip}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-red-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Hours</h3>
                  <p className="text-gray-600">{contact.daysOpen}: {contact.hours}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-red-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
                  <p className="text-gray-600">{contact.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/place/Franklin+Mall/@40.0847306,-74.9638275,17.25z/data=!3m1!5s0x89c14cd1524734f3:0xb825fcec7e598bb0!4m6!3m5!1s0x89c14cd155521e2b:0x552bee52edd01ebf!8m2!3d40.0872957!4d-74.9614271!16zL20vMDcycDJi?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoASAFQAw%3D%3D"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;