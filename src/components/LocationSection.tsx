import React from 'react';
import { MapPin, Clock, Phone, Info, Navigation } from 'lucide-react';
import Image from 'next/image';

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
  // Exact location of Charleys Cheesesteaks from the Google Maps URL
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3051.6772292909394!2d-74.96481!3d40.0844331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c14d2838bf1d9b%3A0x35e137a92f61146c!2sCharleys%20Cheesesteaks!5e0!3m2!1sen!2sus!4v1709932125247!5m2!1sen!2sus`;
  
  // Direct link to get directions to Charleys Cheesesteaks
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Charleys+Cheesesteaks+Philadelphia+Mills&destination_place_id=ChIJm_G4OChOxokRbBRh8pqu4TU`;

  return (
    <section id="location" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Visit Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Located at Charleys Philly Steaks in {contact.address.mall}, accessible via Orange Entrance #5
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
              
              <div className="flex items-start bg-yellow-50 p-4 rounded-lg">
                <Info className="w-6 h-6 text-yellow-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Exact Location</h3>
                  <p className="text-gray-600">We're at the Charleys Philly Steaks counter. Enter through Orange entrance #5.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px] md:h-auto">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Maps showing Charleys Cheesesteaks location"
              title="Charleys Cheesesteaks Location"
            ></iframe>
          </div>
        </div>

        {/* Mall Floor Plan - Using actual mall map image */}
        <div className="mt-10 bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Philadelphia Mills Mall Floor Plan</h3>

          <div className="relative w-full max-w-3xl mx-auto">
            {/* Using an actual mall floor plan image */}
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border-2 border-gray-300">
              {/* Replace this with the actual mall floor plan image path */}
              <Image 
                src="/images/mall-floorplan.gif" 
                alt="Philadelphia Mills Mall Floor Plan" 
                layout="fill" 
                objectFit="contain"
                className="rounded-lg"
              />
              
              {/* You can add a marker overlay on the image if needed */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Position adjusted to be at the end of an arrow next to Charleys label */}
                <div 
                  className="absolute" 
                  style={{ 
                    /* 
                      These values need to be adjusted based on the actual GIF image.
                      Adjust these values to position the marker at the end of the arrow.
                    */
                    top: 'calc(45% + 5px)', 
                    left: 'calc(50% + 25px)',
                    transform: 'translate(-50%, -50%)' 
                  }}
                >
                  <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse flex items-center justify-center shadow-sm">
                    <MapPin className="h-2.5 w-2.5 text-white" />
                  </div>
                  <div className="absolute whitespace-nowrap text-xs font-medium text-red-600 bg-white px-1 rounded-sm shadow-sm" style={{ top: '-18px', left: '50%', transform: 'translateX(-50%)' }}>
                    PhillyPizzaBueno
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center text-gray-600 text-sm">
              <p>Enter through <span className="font-semibold text-orange-500">Orange entrance #5</span> and follow the path to Charleys Cheesesteaks in the Food Court.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Finding Us Inside the Mall</h3>
          <div className="flex flex-col md:flex-row">
            <div className="mb-4 md:mb-0 md:mr-6 md:w-1/2">
              <h4 className="font-medium text-red-600 mb-2">Directions to Our Location:</h4>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li><strong>Enter through the Orange entrance #5</strong></li>
                <li>Come inside the mall and make a left</li>
                <li>Follow the main corridor</li>
                <li>You'll find our Charleys Cheesesteaks location in the Food Court</li>
                <li>We're located to the right of Popeyes</li>
              </ol>
            </div>
            <div className="md:w-1/2">
              <h4 className="font-medium text-red-600 mb-2">Key Landmarks:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><span className="text-orange-500 font-semibold">Orange entrance #5</span> is the closest entrance</li>
                <li>We're in the <span className="font-semibold">Food Court</span> area</li>
                <li>Five and Below is near us</li>
                <li>Star Park is near us</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Mobile-friendly directions button */}
        <div className="mt-8 text-center">
          <a 
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Get Directions to Charleys Cheesesteaks
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;