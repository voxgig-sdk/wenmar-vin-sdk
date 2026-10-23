# WenmarVin SDK feature factory

from wenmarvin_sdk.feature.base_feature import WenmarVinBaseFeature
from wenmarvin_sdk.feature.ratelimit_feature import WenmarVinRatelimitFeature
from wenmarvin_sdk.feature.retry_feature import WenmarVinRetryFeature
from wenmarvin_sdk.feature.test_feature import WenmarVinTestFeature
from wenmarvin_sdk.feature.timeout_feature import WenmarVinTimeoutFeature


_FEATURES = {
    "base": lambda: WenmarVinBaseFeature(),
    "ratelimit": lambda: WenmarVinRatelimitFeature(),
    "retry": lambda: WenmarVinRetryFeature(),
    "test": lambda: WenmarVinTestFeature(),
    "timeout": lambda: WenmarVinTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
