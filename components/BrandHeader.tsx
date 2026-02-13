
'use client';

interface BrandHeaderProps {
  brandData: {
    name: string;
    logo: string;
    description: string;
    rating: number;
    readiness: number;
    complianceStatus: string;
    totalBuyers: number;
    activeBuyers: number;
    totalOrders: number;
    totalSkus: number;
    complianceIssues: number;
    countries: string[];
  };
}

export default function BrandHeader({ brandData }: BrandHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="ri-star-fill text-yellow-400"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="ri-star-half-fill text-yellow-400"></i>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ri-star-line text-gray-300"></i>);
    }

    return stars;
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={brandData.logo}
                alt={`${brandData.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-semibold text-gray-900">{brandData.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(brandData.complianceStatus)}`}>
                  {brandData.complianceStatus}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3 max-w-2xl">{brandData.description}</p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(brandData.rating)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{brandData.rating}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Readiness:</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${brandData.readiness}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{brandData.readiness}%</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {brandData.countries.map((country) => (
                    <img
                      key={country}
                      src={`https://readdy.ai/api/search-image?query=$%7Bcountry%7D%20country%20flag%20icon%20simple%20clean%20design&width=20&height=14&seq=flag-${country}&orientation=landscape`}
                      alt={`${country} flag`}
                      className="w-5 h-3.5 rounded-sm object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap cursor-pointer">
              <i className="ri-download-line mr-2"></i>
              Export Data
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap cursor-pointer">
              <i className="ri-settings-3-line mr-2"></i>
              Manage Brand
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-6 gap-6 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">{brandData.totalBuyers}</div>
            <div className="text-sm text-gray-500">Total Buyers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-green-600">{brandData.activeBuyers}</div>
            <div className="text-sm text-gray-500">Active Buyers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-blue-600">{brandData.totalOrders}</div>
            <div className="text-sm text-gray-500">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-purple-600">{brandData.totalSkus}</div>
            <div className="text-sm text-gray-500">SKUs Listed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-orange-600">${((brandData.totalOrders * 1250) / 100).toFixed(0)}K</div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-semibold ${brandData.complianceIssues > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {brandData.complianceIssues}
            </div>
            <div className="text-sm text-gray-500">Compliance Issues</div>
          </div>
        </div>
      </div>
    </div>
  );
}
