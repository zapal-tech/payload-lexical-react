const init = async () => {
  try {
    const husky = (await import('husky')).default;

    husky();
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
  }
};

init();
