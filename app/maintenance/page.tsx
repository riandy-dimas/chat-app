import Image from 'next/image'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PJgH5lxXYTs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
  return (
    <div className="px-4">
      <main className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center">
        <Image
          src="/maintenance.svg"
          width="150"
          height="150"
          alt="Logo"
          style={{ aspectRatio: '150/150', objectFit: 'contain' }}
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Under Maintenance</h1>
          <p className="text-sm font-medium not-italic leading-normal">
            We are currently undergoing maintenance. Please check back later.
          </p>
        </div>
      </main>
    </div>
  )
}
