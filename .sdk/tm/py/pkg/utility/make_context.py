# WenmarVin SDK utility: make_context

from projectname_sdk.core.context import WenmarVinContext


def make_context_util(ctxmap, basectx):
    return WenmarVinContext(ctxmap, basectx)
