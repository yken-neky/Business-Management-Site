'use client';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="py-6 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
        )}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
} 