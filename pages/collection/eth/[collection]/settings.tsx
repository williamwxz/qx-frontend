import Head from "next/head";
import { fetchCollectionSettings } from "../../../../api/collection";
import { fetchLaunchpadCollection } from "../../../../api/launchpad";
import { CollectionSettings } from "../../../../components/CollectionSettings/CollectionSettings";
import { NotFound } from "../../../../components/NotFound/NotFound";
import { siteConfig } from "../../../../shared/config";

export const getServerSideProps = async ({ params }) => {
  let networkId = null;
  if (siteConfig.NETWORK == "opt-mainnet") {
    networkId = "eth-mainnet";
  } else if (siteConfig.NETWORK == "opt-goerli") {
    networkId = "eth-goerli";
  }

  const collectionPromise = fetchCollectionSettings(
    params.collection,
    networkId
  );
  const hostedCollectionPromise = fetchLaunchpadCollection(params.collection);

  const [collection, hostedCollection] = await Promise.all([
    collectionPromise,
    hostedCollectionPromise,
  ]);

  return {
    props: {
      collection,
      hostedCollection,
    },
  };
};

const CollectionSettingsPage = ({ collection, hostedCollection }) => {
  return (
    <>
      {!!collection ? (
        <>
          <Head>
            <title>{collection.name} Settings - Svim</title>
            <meta
              property="og:title"
              content={collection.name + " Settings - Svim"}
            />

            <meta
              name="description"
              content={`Discover, collect, and sell digital items on the largest NFT marketplace on Optimism. Transact in milliseconds and save up to 100x on gas fees.`}
            />
            <meta
              property="og:description"
              content={`Discover, collect, and sell digital items on the largest NFT marketplace on Optimism. Transact in milliseconds and save up to 100x on gas fees.`}
            />
            <meta
              name="twitter:description"
              content={`Discover, collect, and sell digital items on the largest NFT marketplace on Optimism. Transact in milliseconds and save up to 100x on gas fees.`}
            />

            <meta property="og:image" content={`/opt_banner.png`} />
            <meta
              name="twitter:image"
              content={`https://${siteConfig.WEBSITE_URL}/opt_twitter.png`}
            />
          </Head>

          <CollectionSettings
            collection={collection}
            hostedCollection={hostedCollection}
          />
        </>
      ) : (
        <>
          <Head>
            <title>Not Found | Svim</title>
            <meta property="og:title" content={`Not Found | Svim`} />

            <meta
              name="description"
              content={`Discover, collect, and sell digital items on the largest NFT marketplace on Optimism. Transact in milliseconds and save up to 100x on gas fees.`}
            />
            <meta
              property="og:description"
              content={`Discover, collect, and sell digital items on the largest NFT marketplace on Optimism. Transact in milliseconds and save up to 100x on gas fees.`}
            />
            <meta
              name="twitter:description"
              content={`Discover, collect, and sell digital items on the largest NFT marketplace on Optimism. Transact in milliseconds and save up to 100x on gas fees.`}
            />

            <meta property="og:image" content={`/opt_banner.png`} />
            <meta
              name="twitter:image"
              content={`https://${siteConfig.WEBSITE_URL}/opt_twitter.png`}
            />
          </Head>

          <NotFound />
        </>
      )}
    </>
  );
};

export default CollectionSettingsPage;
