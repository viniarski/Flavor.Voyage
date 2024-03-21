import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mt-8">
        <SignIn
          appearance={{
            elements: {
              rootBox:
                'bg-white border border-gray-300 rounded-lg p-8 shadow-md',
              card: 'bg-transparent',
              headerTitle: 'text-3xl font-bold mb-4 text-accent',
              headerSubtitle: 'text-gray-600 mb-4',
              formFieldInput:
                'border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent',
              footerActionText: 'text-gray-600',
              socialButtonsBlockButton:
                'bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 mb-2',
              formButtonPrimary:
                'bg-accent hover:bg-accent-dark text-white rounded-md p-2',
            },
          }}
          afterSignInUrl="/"
        />
      </div>
    </div>
  );
}
