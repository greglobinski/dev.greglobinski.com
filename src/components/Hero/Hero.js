import React from "react";
import PropTypes from "prop-types";

import FaArrowDown from "react-icons/lib/fa/arrow-down";

const Hero = props => {
  const { scrollToContent, backgrounds, theme } = props;

  return (
    <React.Fragment>
      <section className="hero">
        <small>You{`'`}re visiting:</small>
        <h1>
          Front-end <br />
          web development <br />
          with Greg
        </h1>
        <p>
          JavaScript, GatsbyJS, ReactJS, CSS&nbsp;in&nbsp;JS... <br />Let{`'`}s learn some stuff
          together.
        </p>
        <button onClick={scrollToContent} aria-label="scroll">
          <FaArrowDown />
        </button>
      </section>

      {/* --- STYLES --- */}
      <style jsx>{`
        .hero {
          align-items: center;
          background: ${theme.hero.background};
          background-image: ${`url(${backgrounds.mobile})`};
          background-size: cover;
          color: ${theme.text.color.primary.inverse};
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          min-height: 100vh;
          padding: ${theme.space.inset.l};
          padding-top: ${theme.header.height.homepage};

          :global(.webp) & {
            background-image: ${`url(${backgrounds.mobileWebp})`};
          }
        }

        @media all and (-ms-high-contrast: none) {
          *::-ms-backdrop,
          .hero {
            height: 500px;
          }
        }

        small {
          color: ${theme.hero.h1.color};
          font-size: ${theme.font.size.xs};
          letter-spacing: 0.3em;
          opacity: 0.6;
          display: block;
          margin: ${theme.space.stack.m};
        }

        h1 {
          font-size: ${theme.hero.h1.size};
          margin: ${theme.space.stack.l};
          color: ${theme.hero.h1.color};
          line-height: 1.1;
          text-remove-gap: both 0 "Fira Sans";
          text-align: center;
        }

        p {
          font-size: ${theme.font.size.s};
          color: ${theme.hero.h1.color};
          text-align: center;
          line-height: 1.5;
          opacity: 0.9;
          margin: ${theme.space.stack.m};
        }

        button {
          flex-shrink: 0;
          background: ${theme.background.color.brand};
          border: 0;
          border-radius: ${theme.size.radius.default};
          font-size: ${theme.font.size.xl};
          padding: ${theme.space.s} ${theme.space.m};
          cursor: pointer;
          width: ${theme.space.xl};
          height: ${theme.space.xl};
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all ${theme.time.duration.short};

          &:focus {
            outline-style: none;
            background: ${theme.color.brand.primaryActive};
          }

          :global(svg) {
            fill: ${theme.color.neutral.white};
            animation-duration: ${theme.time.duration.long};
            animation-name: buttonIconMove;
            animation-iteration-count: infinite;
          }
        }

        @keyframes buttonIconMove {
          0% {
            transform: translateY(10px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(10px);
          }
        }

        @from-width tablet {
          .hero {
            background-image: ${`url(${backgrounds.tablet})`};

            :global(.webp) & {
              background-image: ${`url(${backgrounds.tabletWebp})`};
            }
          }

          h1 {
            max-width: 90%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
          }

          p {
            max-width: 90%;
            font-size: ${theme.font.size.m};
          }

          button {
            font-size: ${theme.font.size.xxl};
          }
        }

        @from-width desktop {
          .hero {
            background-image: ${`url(${backgrounds.desktop})`};

            :global(.webp) & {
              background-image: ${`url(${backgrounds.desktopWebp})`};
            }
          }

          h1 {
            max-width: 80%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
          }

          p {
            max-width: 80%;
            font-size: ${theme.font.size.m};
          }

          button {
            font-size: ${theme.font.size.xxxl};
          }

          @media (hover: hover) {
            button {
              &:hover {
                border-radius: 50%;
              }
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Hero.propTypes = {
  scrollToContent: PropTypes.func.isRequired,
  backgrounds: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
