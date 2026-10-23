# WenmarVin SDK exists test

import pytest
from wenmarvin_sdk import WenmarVinSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WenmarVinSDK.test(None, None)
        assert testsdk is not None
