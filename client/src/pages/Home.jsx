import React, { useState } from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import { Loader, Card, FormField } from "../components";
import { email, clouddowm, cloudup, messagecloud, car, balls } from "../assets";
import "../App.css";

const Home = () => {
  const [loading, setLoading] = useState(false);

  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <section className="max-w-7x1 mx-auto">
          <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">
              Here you can't
            </h1>
            <p className="mt-2 text-]#666e75] text-[16px] max-w[500px]">
              with one button you can create whatever you want
            </p>
          </div>
          <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-center">
              <Link to="write-email">
                <Card>
                  <Card.Image src={email} alt="writeEmail" />
                  <Card.Header>Write an Email</Card.Header>
                </Card>
              </Link>
              <Link to="correct-sentence">
                <Card>
                  <Card.Image src={messagecloud} alt="resignation" />
                  <Card.Header>Correct My Language</Card.Header>
                </Card>
              </Link>
              <Link to="/chat-bot">
                <Card>
                  <Card.Image src={clouddowm} alt="Chat Bot" />
                  <Card.Header>Chat Bot</Card.Header>
                </Card>
              </Link>
              <Link to="/chat-bot1">
                <Card>
                  <Card.Image src={cloudup} alt="Chat Bot1" />
                  <Card.Header>Card Title</Card.Header>
                  <Card.Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Description>
                </Card>
              </Link>

              {/* 
              <Link to="">
                <Card>
                  <Card.Image src={balls} alt="placeholder image" />
                  <Card.Header>Card Title</Card.Header>
                  <Card.Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Description>
                </Card>
              </Link> */}
              {/* 
              <Link to="">
                <Card>
                  <Card.Image src={car} alt="placeholder image" />
                  <Card.Header>Card Title</Card.Header>
                  <Card.Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </Card.Description>
                </Card>
              </Link> */}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Home;
