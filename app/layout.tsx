import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  Grommet,
  Header,
  Page,
  Footer,
  PageContent,
  Text,
  Box,
  Anchor,
} from "grommet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🌎 My Countries",
  description:
    "Hi, welcome to 🌎 My Countries, this app will help ypu search and see interesing info about your favorite countries!!!",
};

const AppBar = (props: any) => (
  <Header
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    {...props}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Grommet full>
          <Page height="100%" width="100%" background='#fafaf6'>
            <PageContent pad={{ left: "0" }} height="100%" width="100%">
              <AppBar>
                <Text size="large"> 🌎 My Countries</Text>
              </AppBar>
              <Box style={{ flex: 1 }} pad="medium" overflow="auto">
                {children}
              </Box>
              <Footer background="#000000" justify="center" pad="small">
                <Text>
                  Made with ❤️ by{" "}
                  <b>
                    <Anchor
                      href="https://www.linkedin.com/in/alfer-duran-6071171b5/"
                      label="Alfer Duran"
                      color="#7AD5FF"
                      target="_blank"
                    />
                  </b>{" "}
                  <b>
                    {" "}
                    for{" "}
                    <Anchor
                      href="http://ramva.com/"
                      label="ramva"
                      color="#53EA71"
                      target="_blank"
                    />
                  </b>
                </Text>
              </Footer>
            </PageContent>
          </Page>
        </Grommet>
      </body>
    </html>
  );
}
