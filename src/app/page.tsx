'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      title: "Dashboard",
      description: "Panel de control centralizado con métricas clave y resumen de actividades.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: "/dashboard",
    },
    {
      title: "Usuarios",
      description: "Gestión completa de usuarios, roles y permisos del sistema.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      href: "/users",
    },
    {
      title: "Clientes",
      description: "Administración de clientes, contactos y seguimiento de relaciones.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: "/clients",
    },
    {
      title: "Proyectos",
      description: "Control y seguimiento de proyectos, tareas y entregables.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      href: "/projects",
    },
    {
      title: "Finanzas",
      description: "Gestión financiera, control de ingresos, gastos y reportes.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "/finance",
    },
    {
      title: "Inventario",
      description: "Control de inventario, productos y gestión de stock.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
      href: "/inventory",
    },
  ];

  const footerNavigation = {
    plataforma: [
      { name: 'Acerca de', href: '#' },
      { name: 'Características', href: '#' },
      { name: 'Precios', href: '#' },
      { name: 'Seguridad', href: '#' },
      { name: 'Estado del Sistema', href: '#' },
    ],
    modulos: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Usuarios', href: '/users' },
      { name: 'Clientes', href: '/clients' },
      { name: 'Proyectos', href: '/projects' },
      { name: 'Finanzas', href: '/finance' },
      { name: 'Inventario', href: '/inventory' },
    ],
    soporte: [
      { name: 'Documentación', href: '#' },
      { name: 'Guías', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Comunidad', href: '#' },
      { name: 'Centro de Ayuda', href: '#' },
    ],
    empresa: [
      { name: 'Nosotros', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Empleos', href: '#' },
      { name: 'Socios', href: '#' },
      { name: 'Términos y Condiciones', href: '#' },
    ],
    social: [
      {
        name: 'Facebook',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: 'Twitter',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        ),
      },
      {
        name: 'GitHub',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Hero section */}
      <div className="relative isolate bg-gradient-to-b from-blue-900 to-blue-800">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <Image
              src="/images/hero-business.jpg"
              alt="Business Management"
              fill
              className="mix-blend-overlay opacity-20 object-cover"
              priority
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Sistema de Gestión Empresarial
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-200">
                  Una plataforma integral para la gestión eficiente de tu empresa. Administra usuarios,
                  clientes, proyectos, finanzas e inventario desde un solo lugar.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    Comenzar
                  </Link>
                  <Link href="/users" className="text-sm font-semibold leading-6 text-gray-200 hover:text-white">
                    Ver más <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Todo lo que necesitas para gestionar tu empresa
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Accede a todas las herramientas necesarias para administrar tu negocio de manera eficiente y organizada.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {features.map((feature) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 group-hover:bg-blue-500">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="text-lg font-semibold leading-7 tracking-tight text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-base leading-7 text-gray-600">{feature.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="w-full bg-gradient-to-b from-blue-800 to-blue-900">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Comienza a gestionar tu empresa de manera eficiente
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Únete a las empresas que ya están optimizando su gestión con nuestra plataforma.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-md bg-white px-5 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:shadow-lg"
              >
                Ir al Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <Link href="/" className="text-2xl font-bold text-white">
                GestiónPro
              </Link>
              <p className="text-sm leading-6 text-gray-300">
                Plataforma integral de gestión empresarial diseñada para optimizar y simplificar 
                los procesos de tu negocio, permitiéndote focalizarte en lo que realmente importa: 
                hacer crecer tu empresa.
              </p>
              <div className="flex space-x-6">
                {footerNavigation.social.map((item) => (
                  <Link key={item.name} href={item.href} className="text-gray-500 hover:text-gray-400">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Plataforma</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.plataforma.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Módulos</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.modulos.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Soporte</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.soporte.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Empresa</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.empresa.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs leading-5 text-gray-400 mb-4 md:mb-0">
                &copy; 2024 GestiónPro. Todos los derechos reservados.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-xs leading-5 text-gray-400 hover:text-gray-300">
                  Política de Privacidad
                </Link>
                <Link href="#" className="text-xs leading-5 text-gray-400 hover:text-gray-300">
                  Términos de Uso
                </Link>
                <Link href="#" className="text-xs leading-5 text-gray-400 hover:text-gray-300">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 