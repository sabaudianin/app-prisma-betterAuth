import React from 'react'

export const Navbar = () => {
    return (
        <div className="border-b bg-card shadow-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">DevInsight</h1>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                        {user.email}
                    </span>
                    <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="rounded-md bg-indigo-300 px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-indigo-400/90 disabled:opacity-50 transition-all duration-300"
                    >
                        {isSigningOut ? "Signing out..." : <LogOut className="text-input text-xs" />}
                    </button>
                </div>
            </div>
        </div> >
  )
}
