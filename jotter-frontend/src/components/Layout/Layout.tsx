import TopBar from '../TopBar/TopBar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Layout({ children }:any) {
  return (
    <>
      <TopBar />
      <main>{children}</main>
    </>
  );
}
