import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Cart', href: '/cart' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-black">
      
      {/* 🔝 Top Navbar */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <DisclosureButton className="p-2 text-gray-400 hover:text-white">
              <Bars3Icon className="h-6 w-6 group-data-open:hidden" />
              <XMarkIcon className="h-6 w-6 hidden group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/9561/9561839.png"
              className="h-8"
            />
          </div>

          {/* 🔍 Desktop Search (CENTER) */}
          <div className="hidden sm:flex flex-1 justify-center px-4">
            <div className="relative w-full max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search food..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* 📱 Mobile Menu */}
      <DisclosurePanel className="sm:hidden px-4 pb-3">
        
        {/* 🔍 Mobile Search (FULL WIDTH) */}
        <div className="mb-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search food..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border"
            />
          </div>
        </div>

        {/* Mobile Links */}
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="block text-gray-300 px-3 py-2 rounded-md hover:bg-gray-700"
          >
            {item.name}
          </Link>
        ))}
      </DisclosurePanel>

    </Disclosure>
  )
}
