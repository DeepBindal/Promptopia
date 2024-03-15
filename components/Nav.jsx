"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const { data : session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDrop, setToggleDrop] = useState(false);

  useEffect(() => {
    const setUPProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUPProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex-center flex gap-2">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
            <Image
              src={session?.user.image}
              className="rounded-full"
              width={37}
              alt="profile-pic"
              height={47}
              onClick={() => {
                setToggleDrop((prev) => !prev);
              }}
            /></Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              className="rounded-full"
              width={37}
              alt="profile-pic"
              height={37}
              onClick={() => {
                setToggleDrop((prev) => !prev);
              }}
            />
            {toggleDrop && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDrop(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDrop(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDrop(false);
                    signOut();
                  }}
                  className="mt-5 black_btn w-full"
                >
                  SignuOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
