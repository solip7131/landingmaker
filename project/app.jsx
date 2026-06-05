// ============================================================
//  app.jsx — root composition
// ============================================================

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ctaHidden, setCtaHidden] = useState(false);
  const open = useCallback(() => setModalOpen(true), []);
  const close = useCallback(() => setModalOpen(false), []);

  useRevealRoot();

  // hide floating CTA while the modal is open
  useEffect(() => { setCtaHidden(modalOpen); }, [modalOpen]);

  return (
    <>
      <Nav onOpen={open} />
      <main>
        <Hero onOpen={open} />
        <Stats />
        <Pain onOpen={open} />
        <Features />
        <Portfolio />
        <Process />
        <Prizes onOpen={open} />
        <FinalCTA onOpen={open} />
      </main>
      <Footer />
      <FloatingCTA onOpen={open} hidden={ctaHidden} />
      <ApplyModal open={modalOpen} onClose={close} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
