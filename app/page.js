import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Merhabalar</h1>
        <p className="text-lg text-gray-600">
          Analiz Laboratuvarı Uygulamasına Hoş Geldiniz.
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Analysis Operations Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold text-gray-900">
                Analiz İşlemleri
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-4">
                Tüm analiz işlemlerini buradan yönetebilirsiniz.
              </p>
              <Link href="/analysis" passHref>
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  Başla
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Sample Analysis Report Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-semibold text-gray-900">
                Örnek Analiz Raporu
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-4">
                Örnek analiz raporlarını buradan görüntüleyebilirsiniz.
              </p>
              <Link href="/AR-11" passHref>
                <Button className="bg-green-500 text-white hover:bg-green-600">
                  Raporu Görüntüle
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-8 text-gray-500">
        <p>© 2024 Analiz Laboratuvarı | developed by Ali Yorulmaz </p>
      </div>
    </div>
  );
}

export default Homepage;
